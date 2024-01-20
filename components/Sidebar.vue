<template>
	<UVerticalNavigation :links="links">
		<template #default="{ link }">
			<Logo v-if="link.to === '/'" />
			<span
				class="group-hover:text-primary relative"
				v-else-if="link.label === 'Logout' && status === 'authenticated'"
				>{{ link.label }}</span
			>
			<span class="group-hover:text-primary relative" v-else>{{
				link.label
			}}</span>
		</template>
	</UVerticalNavigation>
</template>
<script setup lang="ts">
const { status } = useAuth();
console.log('status', status);
const links = [
	[
		{
			label: 'Home',
			icon: '',
			to: '/',
		},
		{
			label: 'Practice',
			icon: 'i-heroicons-pencil-square',
			to: '/practice',
		},
		{
			label: 'Leaderboard',
			icon: 'i-heroicons-chart-bar',
			to: '/leaderboard',
		},
	],
	[
		{
			label: 'Logout',
			icon: 'i-heroicons-arrow-left-end-on-rectangle',
			click: logout,
		},
	],
];
function logout() {
	navigateTo('/');
}
</script>
