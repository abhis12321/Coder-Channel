"use client"

export default function ContactForm() {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name:e.target.name.value,
            email:e.target.email.value,
            mobile:e.target.mobile.value,
            problem:e.target.problem.value,
        }

        console.log(payload);
        
        e.target.name.value = ""
        e.target.email.value = ""
        e.target.mobile.value = ""
        e.target.problem.value = ""
    }

    return (
        <div className="h-nav flex items-center justify-center">
            <form className="w-[98%] max-w-[500px] p-4 rounded-md shadow-[0_0_2px_gray] flex flex-col items-center gap-4 bg-white ring-1 ring-gray-500" onSubmit={handleFormSubmit}>
                <div className="w-fit font-bold text-3xl text-gray-600">Contact Us</div>
                <div className="relative w-full group flex items-center justify-center">
                    <label htmlFor="name" className="absolute z-30 top-[-9px] left-[15px] text-xs font-bold text-gray-600 ring-gray-500 ring-1 rounded-lg bg-gray-300 group-focus-within:bg-gray-800 group-focus-within:text-white px-[22px]">Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter your name" className="w-full appearance-none resize-none outline-none text-sm shadow-[0_0_1px_black] focus:shadow-[0_0_5px_gray_inset] rounded-md py-[6px] px-4 ring-1 ring-gray-500" required />
                </div>

                <div className="relative w-full group flex items-center justify-center">
                    <label htmlFor="email" className="absolute z-30 top-[-9px] left-[15px] text-xs font-bold text-gray-600 ring-gray-500 ring-1 rounded-lg bg-gray-300 group-focus-within:bg-gray-800 group-focus-within:text-white px-6">Email</label>
                    <input type="text" name="email" id="email" placeholder="Enter email" className="w-full appearance-none resize-none outline-none text-sm shadow-[0_0_1px_black] focus:shadow-[0_0_5px_gray_inset] rounded-md py-[6px] px-4 ring-1 ring-gray-500" required />
                </div>

                <div className="relative w-full group flex items-center justify-center">
                    <label htmlFor="mobile" className="absolute z-30 top-[-9px] left-[15px] text-xs font-bold text-gray-600 ring-gray-500 ring-1 rounded-lg bg-gray-300 group-focus-within:bg-gray-800 group-focus-within:text-white px-4">Mobile No</label>
                    <input type="text" name="mobile" id="mobile" placeholder="Enter phone number" className="w-full appearance-none resize-none outline-none text-sm shadow-[0_0_1px_black] focus:shadow-[0_0_5px_gray_inset] rounded-md py-[6px] px-4 ring-1 ring-gray-500" required />
                </div>

                <div className="relative w-full group flex items-center justify-center">
                    <label htmlFor="problem" className="absolute z-30 top-[-9px] left-[15px] text-xs font-bold text-gray-600 ring-gray-500 ring-1 rounded-lg bg-gray-300 group-focus-within:bg-gray-800 group-focus-within:text-white px-6">Problem</label>
                    <textarea name="problem" id="problem" placeholder="Enter your problem" className="w-full appearance-none resize-none outline-none text-sm shadow-[0_0_1px_black] focus:shadow-[0_0_5px_gray_inset] rounded-md py-[6px] px-4 ring-1 ring-gray-500" rows={7} required></textarea>
                </div>
                <input type="submit" value="send" className="w-full py-[6.5px] rounded-md text-sm font-semibold cursor-pointer ring-1 ring-red-800 bg-red-700 hover:bg-red-600 active:bg-violet-700 text-white" />
            </form>
        </div>
    )
}
