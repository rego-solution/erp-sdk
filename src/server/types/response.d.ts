export type TApiResponse<T> = Readonly<{
    data: Awaited<
        ReturnType<
            T extends (...args: any) => Promise<infer R> ? () => R : never
        >
    >;
}>;
