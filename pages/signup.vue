<template>
	<div class="max-w-[560px] mx-auto pt-10 pb-5">
		<UCard
			:ui="{
				background: 'bg-transparent',
				ring: 'ring-none',
				shadow: 'shadow-md',
				rounded: 'rounded-[2px]',
				divide: 'divide-none',
			}"
		>
			<template #header>
				<LoginToggle />
				<div
					class="mt-1 text-sm text-black-500 rounded bg-red-700 p-3"
					v-if="form && form.errors && form.errors.length"
				>
					<h4 class="uppercase">Validation errors</h4>
					<li v-for="error in form.errors" :key="error" class="text-red-500">
						{{ error }}
					</li>
				</div>
			</template>
			<UForm
				ref="form"
				:schema="schema"
				:state="signupForm"
				@submit="submit"
				v-if="!user"
				class="rounded my-[2em] px-[20px] border-[1px] border-gray-500 py-[20px]"
			>
				<div class="space-y-3">
					<div class="flex gap-5">
						<UFormGroup
							label="First Name *"
							name="firstname"
							class="xs:basis-[100%] sm:basis-[50%] xs:max-w-[100%] sm:max-w-[50%]"
						>
							<UInput v-model="signupForm.firstname" type="text" />
						</UFormGroup>
						<UFormGroup
							label="Last Name *"
							name="lastname"
							class="xs:basis-[100%] sm:basis-[50%] xs:max-w-[100%] sm:max-w-[50%]"
						>
							<UInput v-model="signupForm.lastname" type="text" />
						</UFormGroup>
					</div>
					<UFormGroup label="Email Address *" name="email">
						<UInput v-model="signupForm.email" type="email" />
					</UFormGroup>
					<UFormGroup
						label="Phone *"
						name="phone"
						class="phone"
						:ui="{
							container: 'mt-1 relative',
						}"
					>
						<CountryCodePicker v-model="signupForm.phone" />
					</UFormGroup>
					<UFormGroup label="Password *" name="password">
						<UInput
							v-model="signupForm.password"
							:type="showPass ? 'text' : 'password'"
							:ui="{
								icon: { footer: { pointer: 'cursor' } },
							}"
						>
							<template #footer>
								<UButton
									v-if="signupForm.password.length"
									@click="showPass = !showPass"
									class="text-gray-500 dark:text-gray-400 text-xs"
									:icon="
										!showPass ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'
									"
									variant="link"
								/>
							</template>
						</UInput>
					</UFormGroup>
					<UFormGroup label="Confirm Password *" name="confirmpassword">
						<UInput v-model="signupForm.confirmpassword" type="password">
						</UInput>
					</UFormGroup>
					<UButton type="submit" color="black" class="px-8" :disabled="loading">
						Sign Up
					</UButton>
				</div>
			</UForm>
			<VerifyEmail
				v-else-if="user"
				:value="user.email"
				type="email"
				:otpval="otpval"
				@success="onSuccess"
			/>
		</UCard>
	</div>
</template>
<script setup lang="ts">
import type { UserProfile } from '~/types/auth.interface';
import * as yup from 'yup';

const showPass = ref(false);

useHead({
	title: 'New User Registration',
});
definePageMeta({
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: '/',
	},
});

const signupForm = ref({
	firstname: '',
	lastname: '',
	email: '',
	phone: '',
	password: '',
	confirmpassword: '',
	investorTypeId: '2',
	roleId: '3',
});
const form = ref();
const error = ref<boolean | string>();
const user = ref();
let otpval: any = '';
const loading = ref(false);
const schema = yup.object({
	firstname: yup.string().min(3).required(),
	lastname: yup.string().min(3),
	email: yup.string().email().required(),
	phone: yup.number().min(10).required().typeError('Please enter numbers only'),
	password: yup.string().min(8).required(),
	investorTypeId: yup.string().required(),
	confirmpassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords do not match'),
});

const toast = useToast();

function onSuccess(flag: boolean) {
	if (flag) {
		navigateTo('/');
	}
}
async function submit() {
	if (loading.value === false) {
		loading.value = true;
	} else {
		return;
	}
	error.value = false;
	try {
		const state = await form.value?.validate();
		if (state === undefined) {
			error.value = true;
		}
		const resp = await $fetch<
			Promise<{
				status: number;
				message?: string;
				user: UserProfile;
				otp?: number;
			}>
		>('/api/user/signup', {
			method: 'post',
			body: {
				...signupForm.value,
			},
		});
		otpval = resp.otp;
		if (resp.status === 200) {
			error.value = resp.message;
			toast.add({
				title: resp.message,
			});
			if (resp.user) {
				user.value = resp.user;
			}
		} else {
			error.value = resp.message;
			toast.add({
				title: resp.message,
				color: 'red',
			});
		}
	} catch (e) {
		toast.add({
			title: 'Please enter valid data',
			color: 'red',
		});
	} finally {
		loading.value = false;
	}
}
</script>
<style lang="scss">
.phone {
	> .relative > .relative:not(.w-full) {
		position: absolute;
		left: 0;
		z-index: 10;
	}
	> .relative > .relative.w-full {
		padding-left: 60px;
		z-index: 9;
		> input {
			padding-left: 70px;
		}
		> span {
			max-width: 70px;
			display: inline-block;
			line-height: 30px;
			overflow-x: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			left: 60px;
			z-index: 10;
			padding-right: 10px;
			padding-left: 5px;
			color: rgb(17 24 39);
			font-size: 0.875rem /* 14px */;
		}
	}
}
</style>
