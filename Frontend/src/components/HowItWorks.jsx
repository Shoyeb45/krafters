import icon1 from '/assets/solar_login-3-broken.png';
import icon2 from '/assets/solar_login-3-broken (1).png';
import icon3 from '/assets/solar_login-3-broken (2).png';
import image1 from '/assets/Photo.png';
import image2 from '/assets/Photo (1).png';
import image3 from '/assets/Frame 1.png';

const HowItWorks = () => {
    return (
        <div className="flex px-24 py-22 justify-between">
            <div className="w-1/2 flex flex-col gap-12">
                <h1 className="text-5xl text-neutral-900 font-medium ">
                    How It Fixes Problem
                </h1>
                <div className='flex w-lg flex-col gap-7'>

                    <div className="w-full gap-2 flex justify-between ">
                        <div className="font-medium text-8xl text-primary/15">01</div>
                        <div className='w-full flex items-center gap-4 bg-white border rounded-xl p-4 border-neutral-200'>
                            <img src={icon1} className='w-12 h-12' />
                            <div>
                                <h2 className="text-2xl font-semibold text-neutral-900">Interactive learning</h2>
                                <p className="text-neutral-600">Provide interactive learning for students</p>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full gap-2 flex justify-between ">
                        <div className='w-full flex items-center gap-4 bg-white border rounded-xl p-4 border-neutral-200'>
                            <img src={icon2} className='w-12 h-12' />
                            <div>
                                <h2 className="text-2xl font-semibold text-neutral-900">Understanding Concerns</h2>
                                <p className="text-neutral-600">Understand issue and help</p>
                            </div>
                        </div>
                        <div className="font-medium text-8xl text-primary/15">02</div>
                    </div>
                    <div className=" w-full gap-2 flex justify-between ">
                        <div className="font-medium text-8xl text-primary/15">03</div>
                        <div className='w-full flex items-center gap-4 bg-white border rounded-xl p-4 border-neutral-200'>
                            <img src={icon3} className='w-12 h-12' />
                            <div>
                                <h2 className="text-2xl font-semibold text-neutral-900">Personalization</h2>
                                <p className="text-neutral-600">Custom learning curve for you</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex gap-4">
                <div className='flex flex-col'>
                    <img src={image1} alt="How it works" className=" w-[230px]  rounded-2xl shadow-lg" />
                    <div className='relative gap-2 h-22 left-20 top-4 bg-white flex p-4  border border-neutral-200 rounded-2xl'>
                        <img src={image3} alt="How it works" className="rounded-2xl shadow-lg" />
                        <div className=''>
                            <h1 className='text-xl text-blue'>10k+</h1>
                            {/* <p className='text-sm text-neutral-600'>Job Seekers</p> */}
                        </div>
                    </div>
                </div>
                <div>
                    <img src={image2} alt="How it works" className=" w-[360px] rounded-2xl shadow-lg" />
                </div>
            </div>
        </div>
    )
}

export default HowItWorks
