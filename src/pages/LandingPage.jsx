import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const handleShorten = (e) => {
    e.preventDefault();
    if (url) {
      navigate(`/auth?createNew=${url}`);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 lg:text-7xl sm:text-6xl text-center font-extrabold text-3xl">
        The only URL Shortener you&lsquo;ll ever need 👇
      </h2>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          placeholder="Enter your long url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" variant="destructive" type="submit">
          Shorten!
        </Button>
      </form>
      <img src="/banner.jpg" alt="banner" className="my-11 md:px-11 w-full" />
      <Accordion type="mutliple" className="w-full md:p-11" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
