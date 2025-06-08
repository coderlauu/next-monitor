interface InitOptions {
    dsn: string
}

export const init = (options: InitOptions) => {
    console.log('init', options)
}
