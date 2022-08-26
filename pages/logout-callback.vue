<script setup>
const { revokeToken } = useToken()
revokeToken()
navigateTo('sign-in')
</script>
