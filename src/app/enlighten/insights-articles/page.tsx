import Articles from "@/app/components/Articles/Articles";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

const page = () => (
  <FigmaPageCanvas
    desktop={<Articles canvas />}
    mobile={<Articles />}
    nodeId="7080:58112"
    designHeight={1890}
    scaleToViewport="width"
    fitCanvasHeight
  />
);

export default page;
