"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import QRCode from 'qrcode'
export default function Page() {
    const [imgSrc, setImg] = useState("")
    const [url, setUrl] = useState("")
    const router = useRouter()
    const auth = authClient.useSession()
    async function generateQRCode() {
        const qr = await QRCode.toDataURL(url)
        setImg(qr)
    }
    const logout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/"); // redirect to login page
                },
            },
        });
    }
    return (
        <div className="w-screen h-screen overflow-hidden">

            <div className="flex items-center justify-between border-b-3 bg-transparent px-4 py-4 sm:px-8 ">
                <span className="text-lg sm:text-xl">{auth.data?.user.email}</span>

                <Button
                    className="ml-4"
                    size={"lg"}
                    onClick={() => logout()}
                >
                    log uit
                </Button>
            </div>
            <div className=" h-full justify-center items-center flex flex-col  w-full space-x-4">
                <div className="flex w-full justify-center items-center  space-x-4">
                    <Input
                        value={url}
                        onChange={(event) => {
                            setUrl(event.target.value);
                        }}
                        className="max-w-2xl">
                    </Input>
                    <Button onClick={() => generateQRCode()}>Create qr</Button>
                </div>
                {imgSrc != "" ? <img  src={imgSrc}></img> : ""}
            </div>
        </div >
    )
}