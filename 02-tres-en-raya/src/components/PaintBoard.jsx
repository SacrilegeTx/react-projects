import React from "react";
import Square from "./Square";

const PaintBoard = ({board, updateBoard}) => {
	return (
		<>
			{board.map((square, index) => {
				return (
					<Square key={index} index={index} updateBoard={updateBoard}>
						{square}
					</Square>
				);
			})}
		</>
	);
};

export default PaintBoard;
