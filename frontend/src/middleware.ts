export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        "/restaurant/create",
        "/reserve",
        "/dashboard"

    ]
}
