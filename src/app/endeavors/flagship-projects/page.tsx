import FlagShip from "@/app/components/Projects/FlagShip";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

const page = () => {
  return (
    <FigmaPageCanvas
      desktop={<FlagShip />}
      mobile={<FlagShip />}
      nodeId="7077:14937"
      fitCanvasHeight
    />
  );
};

export default page;
