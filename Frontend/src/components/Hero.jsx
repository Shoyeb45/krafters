import Background from '../assets/Backgroudn Gradient.png'
import { BriefcaseBusiness, Search } from 'lucide-react';
import HorizontalScrollingImages from './HorizontalScrollingImages';

const Hero = () => {
    return (
        <div className='flex justify-center '>
            <div className="w-4xl flex flex-col gap-6 items-center pt-38">
                <div className='w-fit px-6 py-2 items-center text-primary flex gap-2 bg-white rounded-full'>
                    <BriefcaseBusiness size={20} strokeWidth={1} className=' text-primary ' />
                    Your #1 Learning Platform but in engaging style
                </div>
                <h1 className='text-7xl font-semibold text-center text-black'><span className='text-8xl'>Engage in Classes 👨‍💻 </span><br /> more than before</h1>
                <p className='w-md text-center text-lg text-secondary'> Make your classes more interesting and fun ✨.</p>
                <div className='w-2xl flex gap-3'>
                    <div className='flex-1'>
                        <div className='flex items-center gap-3 px-6 border border-neutral-300 rounded-full'>
                            <Search size={20} strokeWidth={2} className='text-primary ' />
                            <input className='w-full px-2 py-4  focus:outline-none' placeholder='Courses...' ></input>
                        </div>
                    </div>
                    <button className='w-fit bg-pwpurple/90 rounded-full text-white px-12 py-4'>Search</button>
                </div>
                <div className=''>
                    <HorizontalScrollingImages />
                </div>
            </div>
        </div>
    )
}

export default Hero
