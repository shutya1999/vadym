import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/prisma/prisma-client';
import {compare, bcrypt, hash, genSalt} from "bcrypt";

import axios from 'axios';
import { log } from 'node:console';

const auth: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                login: { type: 'text' },
                password: { type: 'password' }
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                const values = {
                    email: credentials.login,
                };

                const findUser = await prisma.user.findFirst({
                    where: values,
                });

                if (!findUser) {
                    console.log('2');
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, findUser.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role,
                };
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
};

export default auth;
