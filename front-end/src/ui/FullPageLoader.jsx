function FullPageLoader() {
    return (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
            <img
                src="/logos/logo.gif"
                alt="Loading..."
                className="h-28 w-28 rounded-full object-cover object-center"
            />
        </div>
    )
}

export default FullPageLoader
