import {
  ArrowLeftIcon,
  BoltIcon,
  BookOpenIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassCircleIcon,
  ChevronLeftIcon,
  DocumentTextIcon,
  GiftIcon,
  HomeIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
  TrophyIcon,
  UsersIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { DocumentContext } from "../context/Provider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { icon: HomeIcon, label: "Home", active: false },
    { icon: BookOpenIcon, label: "Study", active: true },
    { icon: RectangleStackIcon, label: "Batches", active: false },
    { icon: WifiIcon, label: "Offline", active: false },
    { icon: BoltIcon, label: "Power Batch", active: false },
    { icon: ShoppingCartIcon, label: "PW Store", active: false },
    { icon: DocumentTextIcon, label: "Test Series", active: false },
    { icon: TrophyIcon, label: "Scholarship", active: false },
    { icon: UsersIcon, label: "VP-RP", active: false, isNew: true },
    { icon: UsersIcon, label: "Become Our Partner", active: false },
    { icon: UsersIcon, label: "Become Our Partner", active: false },
    { icon: GiftIcon, label: "Disha", active: false, isNew: true },
    { icon: UsersIcon, label: "Become Our Partner", active: false },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {/* <img src='' alt='' /> */}
          <span className="font-semibold text-lg text-gray-800">
            Physics Wallah
          </span>
        </div>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="ml-3 font-medium">{item.label}</span>
              {item.isNew && (
                <span className="ml-auto bg-orange-400 text-white text-xs px-2 py-1 rounded">
                  NEW
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

const Courses = ({ onCourseSelect }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <MainContent onCourseSelect={onCourseSelect} />
    </div>
  );
};

const MainContent = ({ onCourseSelect }) => {
  const navigate = useNavigate();
  const { getCourses } = useContext(DocumentContext);
  const [batches, setBatches] = useState([]);
  const { backendUrl } = useContext(DocumentContext);
  useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(backendUrl + "/api/course/get-all");
                console.log(res.data);
                setBatches(res.data.courses);
            } catch (error) {
                console.error("Failed while fetching all the courser\n", error);
            }
        })();
  }, []);

  const filters = [
    "Filter",
    "Online",
    "Free",
    "Mahapack",
    "All",
    "Vp lIVE",
    "offline",
    "Up Coming",
    "RBI",
    "STREAM Type",
  ];
  const [activeFilter, setActiveFilter] = useState(null);
  const handleCourseClick = (batch) => {
    if (onCourseSelect) {
      onCourseSelect(batch);
    }
  };
  const handleFilterClick = (index) => {
    setActiveFilter(index);
  };

  return (
    <div className="flex-1 bg-gray-50 h-screen overflow-hidden flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-[10.5px] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <ChevronLeftIcon className="w-7 h-7 font-extrabold text-black" />
              <span className="ml-2 text-lg text-black font-bold">Back</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600 px-3 py-1 bg-slate-200 rounded-full">
              {/* <img src='' alt='batch' /> */}
              <span className="text-[1.5em] font-extrabold text-black">
                420
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-black font-semibold">
                Hi, Sazid
              </span>
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="w-full p-4 flex items-center gap-4 rounded-lg">
            <div className="relative flex-1">
              <MagnifyingGlassCircleIcon className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700" />
              <input
                type="text"
                name="search"
                placeholder="Search for the 'batches'..."
                className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none bg-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-10 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Study
            </button>
          </div>

          <div className="w-full h-[180px] relative overflow-hidden">
            <img src='assets/banner.jpg' alt='' className="absolute top-0 left-0"/>
          </div>

          <div className="flex justify-around items-center gap-6 mt-2 mb-4">
            {filters.map((filter, index) => (
              <button
                key={index}
                onClick={() => handleFilterClick(index)}
                className={`p-2 cursor-pointer transition-all duration-200 border-b-2 hover:bg-gray-100 rounded-t-md ${
                  activeFilter === index
                    ? "border-b-blue-700 border-b-[6px]"
                    : "text-black border-b-transparent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Batches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches ? (
              batches.map((batch) => (
                <div
                  key={batch._id}
                  className=" rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow p-3"
                  onClick={() => navigate(`/batch/${batch._id}`)}
                >
                  {/* Card Header */}
                  <div className="flex justify-evenly items-center">
                    <h1 className="mr-9">{batch.title}</h1>

                    <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-medium mb-3">
                      new
                    </span>
                    <GiftIcon className="h-4 w-4 mb-3" />
                  </div>

                  <div className="relative w-[270px] h-[160px] bg-slate-400 my-2 mb-7 ">
                    <img
                      src={batch.thumbnail.secure_url}
                      alt="batch"
                      className="absolute w-full h-full top-0 left-0"
                    />
                  </div>
                  <div>
                    {batch.category}
                    <p className="w-full bg-gray-400 h-[1px] mt-9"></p>
                  </div>
                  <div className="flex justify-center items-center gap-7 mt-5 ">
                    <div className="flex justify-center items-center gap-1">
                      <p className="text-lg font-semibold">
                        &#8377;{batch.price - 100}
                      </p>
                      <p className="line-through text-gray-500">
                        {batch.price}
                      </p>
                    </div>
                    <div className="p-2 bg-green-300 flex justify-center items-center gap-2">
                      <p>{30 + "%"}</p>
                      <p>Discount</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center items-center gap-7"></div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4 text-center">
                <p className="text-gray-500">
                  No courses available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
