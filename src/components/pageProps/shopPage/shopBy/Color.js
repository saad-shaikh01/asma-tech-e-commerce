import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../../../statemanagment/reducers/filter.reducer";
const Color = ({ onColorSelect }) => {
  const dispatch = useDispatch()
  const [showColors, setShowColors] = useState(true);
  const selectedColor = useSelector((state) => state.rootReducer.filter.color);
  const productColors = useSelector((state) => state.rootReducer.product?.product?.products )
 // Filter unique colors
 const uniqueColors = ["All Colors",   ...new Set(productColors.map((item) => item.color))];
console.log(uniqueColors)
const handleColorChange = (selectedColor) => {
  if (selectedColor === "All Colors") {
    dispatch(setColor(null)); // Clear the selected category
  } else {
    dispatch(setColor(selectedColor));
  }
}
  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Color" icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {uniqueColors?.map((color) => (
              <li
                // key={item._id}
                className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 ${
                  selectedColor === color || (!selectedColor && color === "All Colors")? 'font-bold' : ''
                }`}
                onClick={()=> handleColorChange(color)}
            >
                <span
                  style={{ background: color }}
                  className={`w-3 h-3 bg-gray-500 rounded-full`}
                ></span>
                {color}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
