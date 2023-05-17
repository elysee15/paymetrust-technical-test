import { useEffect, useState } from "react";
import Square from "./_square";

type Position = {
  x: number;
  y: number;
};

export default function Squares({ count }: { count: number }) {
  const squares = useSquares(count);
  return <>{squares}</>;
}

const useSquares = (count: number) => {
  const [squares, setSquares] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const squareSize = 50;

    const generateRandomPosition = (
      existingPositions: Position[]
    ): Position => {
      const posX = Math.floor(Math.random() * (window.innerWidth - squareSize));
      const posY = Math.floor(
        Math.random() * (window.innerHeight - squareSize)
      );
      const newPosition = { x: posX, y: posY };

      // check for collision
      const collision = existingPositions.some((position) => {
        const distance = Math.sqrt(
          Math.pow(position.x - newPosition.x, 2) +
            Math.pow(position.y - newPosition.y, 2)
        );
        return distance < squareSize;
      });

      // if collision, generate new position
      if (collision) {
        return generateRandomPosition(existingPositions);
      }

      return newPosition;
    };

    const createSquares = () => {
      const newSquares: JSX.Element[] = [];
      const existingPositions: any[] = [];

      for (let i = 0; i < count; i++) {
        const position = generateRandomPosition(existingPositions);
        existingPositions.push(position);

        newSquares.push(<Square key={i} position={position} />);
      }
      setSquares(newSquares);
    };

    createSquares();
  }, [count]);

  return squares;
};
