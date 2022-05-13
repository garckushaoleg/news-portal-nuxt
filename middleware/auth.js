export default function({ store, redirect, route }) {
    const isRegistration = route.fullPath === '/registration';
    const IsLogin = route.fullPath === '/login';
    if (isRegistration || IsLogin) return;

    if (!store.state.isAuthenticated) {
      return redirect('/login')
    }
}