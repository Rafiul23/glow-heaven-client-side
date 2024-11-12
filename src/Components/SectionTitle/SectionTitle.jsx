

const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="text-center py-10 md:w-4/12 mx-auto">
            <p className="text-[#800] mb-2 italic">---{subHeading}---</p>
            <h3 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;