export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10 text-center text-gray-700 border-t">
      <p>
        Have suggestions or feedback?{" "}
        <a
          href="mailto:honestcomputer@gmail.com.com"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
      </p>
      <p className="mt-2 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AJ Fitness Tracker. All rights reserved.
      </p>
    </footer>
  );
}
