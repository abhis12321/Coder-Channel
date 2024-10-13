export default function LoadingPage() {
    return (
        <div className="fixed top-0 left-0 z-20 h-[100vh] w-full flex items-center justify-center bg-gray-700/90">
            <div className={`flex items-center justify-center h-nav`}>
                <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center"><div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white"></div></div>
            </div>
        </div>
    )
}
