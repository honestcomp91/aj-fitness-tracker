export default function Header() {
    return (
        // <div className="flex items-center mb-6 space-x-4">
        //   <img src="/aj.png" alt="AJ Fitness Tracker Logo" className="w-32 h-24 object-contain" />
        //   <h1 className="text-3xl font-bold">AJ Fitness Tracker</h1>
        // </div>
        <div className="flex items-center justify-between p-4 bg-white shadow">
            <div className="flex items-center space-x-4">
                <img src="/aj-hd.png" alt="AJ Fitness Tracker Logo" className="w-14 h-14 object-contain" />
                <h1 className="text-md md:text-3xl font-bold text-gray-800">AJ Fitness Tracker</h1>
            </div>
            <span className="text-sm text-blue-600 font-semibold italic hidden md:inline">
                Track. Grow. Define.
            </span>
        </div>

    );
}
