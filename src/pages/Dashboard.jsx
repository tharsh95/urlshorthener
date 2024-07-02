/* eslint-disable react-hooks/exhaustive-deps */
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrlls";
import { getClicks } from "@/db/apiClicks";
import Error from "@/components/Error";
import LinkCard from "@/components/LinkCard";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const { user } = UrlState();

  const {
    data: urls,
    error,
    loading,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const urlIds = urls?.map((el) => el.id);

  const {
    data: clicks,
    loading: loadingClicks,
    fn: fnClicks,
  } = useFetch(getClicks, urlIds);

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredData = urls?.filter((el) =>
    el.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Links created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1>My Links</h1>
        <Button>Create Link</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error.message} />}
      {(filteredData||[]).map((el)=> <LinkCard key={el.id} url={el} fetchUrl={fnUrls}/> )}
    </div>
  );
};

export default Dashboard;
