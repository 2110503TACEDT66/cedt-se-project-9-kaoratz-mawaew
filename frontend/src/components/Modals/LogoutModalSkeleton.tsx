export default function LogoutModalSkeleton() {


    return (
        <>
                <dialog className="fixed top-0 left-0 w-[100vw] h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg w-1/4">
                        <h1 className="text-2xl font-bold">Are you sure you want to logout?</h1>
                    </div>
                </dialog>
        </>
    )
}
