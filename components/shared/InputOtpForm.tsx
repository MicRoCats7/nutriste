"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import * as API_AUTH from "@/service/apiAuth"
import { usePathname, useRouter } from "next/navigation"
import { useLoading } from "@/context/LoadingContext"

const FormSchema = z.object({
    pin: z.string().min(5, {
        message: "Kode OTP harus terdiri dari 5 digit",
    }),
})

export function InputOTPForm() {
    const router = useRouter();
    const { setLoading } = useLoading();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    async function handleVerifyOtp(data: z.infer<typeof FormSchema>) {
        setLoading(true);

        await API_AUTH.VerifyOtp({
            email: localStorage.getItem("email") || "",
            otp: data.pin,
        })
            .then((res: any) => {
                toast.success(res.data.message)
                console.log(res);
                if (pathname === "/forgot-password/verify") {
                    router.push("/forgot-password/verify-success");
                } else if (pathname === "/verify") {
                    router.push("/verify-success");
                    localStorage.removeItem("email");
                }
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                setLoading(false);
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVerifyOtp)} className="w-2/3 space-y-6 mt-9">
                <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-third font-normal text-base">Masukkan 5 Digit Angka</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={5} {...field}>
                                    <InputOTPGroup className="grid grid-cols-5 gap-6 justify-center">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full py-6 bg-[#AFCB6B] font-semibold text-lg">Verifikasi Kode</Button>
            </form>
        </Form>
    )
}
