<template>
	<div class="max-w-[555px] mx-auto pt-10 pb-5">
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
				<Logo />
				<div
					class="mt-1 text-sm text-black-500 rounded bg-red-700 p-3"
					v-if="error"
				>
					{{ errors[error] }}
				</div>
			</template>
			<UForm
				ref="form"
				:schema="schema"
				:state="loginForm"
				@submit="submit"
				class="rounded px-[20px] border-[1px] border-gray-500 py-[20px]"
			>
				<div class="space-y-3">
					<UFormGroup label="Username or email address *" name="email">
						<UInput v-model="loginForm.email" type="email" />
					</UFormGroup>
					<UFormGroup label="Password *" name="password">
						<UInput
							v-model="loginForm.password"
							:type="showPass ? 'text' : 'password'"
							:ui="{
								icon: { trailing: { pointer: 'cursor' } },
							}"
						>
							<template #footer>
								<UButton
									v-if="loginForm.password.length"
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

					<div class="flex items-center">
						<UButton
							type="submit"
							color="white"
							variant="outline"
							size="xl"
							class="px-8 mr-3 uppercase"
						>
							Log In
						</UButton>
					</div>
				</div>
			</UForm>
		</UCard>
	</div>
</template>
<script setup>
import * as yup from 'yup';

definePageMeta({
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: '/profile',
	},
});
useHead({
	title: 'Login | Stockify',
});
const showPass = ref(false);
const { signIn, getSession } = useAuth();
const errors = {
	CredentialsSignin: 'Credentials are not working',
};
const loginForm = ref({
	email: '',
	password: '',
	remember: false,
});

const form = ref(null);
const error = ref(false);
const schema = ref(
	yup.object({
		email: yup.string().required(),
		password: yup.string().min(8).required(),
	})
);

async function submit() {
	error.value = false;
	try {
		const state = await form.value?.validate();
		if (state === undefined) {
			error.value = true;
		}
		const { currentRoute } = useRouter();
		const { email, password, remember } = loginForm.value;
		const { error: signInError, url } = await signIn('credentials', {
			username: email,
			password,
			remember,
			callbackUrl: currentRoute.value.query?.callbackUrl,
			redirect: false,
		});
		if (signInError) {
			error.value = signInError;
		} else {
			const session = await getSession();
			navigateTo(session.user?.Role?.role.includes('Admin') ? '/' : url, {
				replace: true,
				external: true,
			});
		}
	} catch (e) {
		console.log(e.message);
	}
}
</script>
