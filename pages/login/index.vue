<template>
    <v-container class="d-flex justify-center">
        <form 
            @submit.prevent="login" 
            style="max-width: 300px; width: 100%;" 
            v-if="!$store.state.isAuthenticated"
        >
            <v-text-field
                v-model="email"
                label="E-mail"
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-text-field>
            <v-btn
                class="mr-4"
                type="submit"
            >
                Log In
            </v-btn>
        </form>
        <form 
            @submit.prevent="logout" 
            style="max-width: 300px; width: 100%;" 
            v-else
        >
            <h2 style="margin: 20px 0;">You are login</h2>
            <v-btn
                class="mr-4"
                type="submit"
            >
                Log Out
            </v-btn>
        </form>
       <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="text-h5">Error</v-card-title>
                <v-card-text>Email or password are incorrect</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="purple darken-1"
                        text
                        @click="dialog = false"
                    >
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            email: '',
            password: '',
            showPassword: false,
            dialog: false
        }),

        methods: {
            login() {
                if (this.email === 'test@test.com' && this.password === 'test') {
                    this.$store.commit('changeAccess', true);
                    this.$router.push('/dashboard');
                } else {
                    this.dialog = true;
                }
            },
            logout() {
                this.$store.commit('changeAccess', false);
            }
        },
    }
</script>
