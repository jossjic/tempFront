import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-screen w-screen items-center justify-center flex-col">
            <h1 className="">404</h1>
            <Link href={"/"}>
                <button className="hover:text-blue-alt hover:underline">
                    Regresar
                </button>
            </Link>
        </div>
    )
}

