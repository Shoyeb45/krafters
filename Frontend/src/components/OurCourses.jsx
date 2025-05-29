import { Search } from "lucide-react";
import bg from '../assets/Backgroudn Gradient (2).png'
export default function OurCourses() {
    return (
        <div className="w-full flex flex-col justify-center items-center h-96  ">
            <img src={bg} className="w-full  absolute -z-2" />
            <div className="mt-44"></div>
            <div className="flex items justify-center w-7xl mt-44 py-32  rounded-2xl bg-gradient-to-b from-violet-300 via-white to-violet-300">
                <div className="w-xl flex flex-col justify-center items-center gap-6   ">
                    <p className="">KNOWLEDGEPULSE</p>
                    <h1 className="text-6xl font-bold text-neutral-900 ">Our Courses</h1>
                    <p className="text-center text-neutral-600">This platform's simplicity belies its powerful capabilities, offering a seamless and enjoyable educational expirience.</p>
                    <div className='w-2xl flex gap-3'>
                        <div className='flex-1'>
                            <div className='flex items-center gap-3 px-6 border border-neutral-300 rounded-full'>
                                <Search size={20} strokeWidth={2} className='text-primary ' />
                                <input className='w-full px-2 py-4  focus:outline-none' placeholder='Courses...' ></input>
                            </div>
                        </div>
                        <button className='w-fit bg-blue rounded-full text-white px-12 py-4'>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

