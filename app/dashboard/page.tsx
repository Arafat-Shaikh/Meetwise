"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [calendarInfo, setCalendarInfo] = useState<any>();
  const [newEvent, setNewEvent] = useState<any>("");
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading</p>;
  }

  const getCalendarList = async () => {
    const response = await fetch("/api/calendar/events");
    const data = await response.json();
    setCalendarInfo(data);
    console.log(data.events);
  };

  const handleCreateEvent = async () => {
    const response = await fetch("/api/calendar/events", {
      method: "POST",
      body: "",
    });

    const data = await response.json();

    setNewEvent(data);
  };
  return (
    <div>
      DashboardPage
      <div>
        <div>
          <Button onClick={() => signOut()}>log out</Button>
        </div>
        <div>
          <div>profile setup page</div>
          <div>{status}</div>

          <Button onClick={getCalendarList}>Get calendar info</Button>

          <div className="mt-10">
            {calendarInfo?.calendarList?.map((item: any) => (
              <p key={item.id}>{item.id}</p>
            ))}
          </div>
          <div className="mt-10">
            {calendarInfo?.events?.map((item: any) => (
              <p key={item.id}>{item.summary}</p>
            ))}
          </div>

          <Button onClick={handleCreateEvent} className="mt-10">
            create event in calendar
          </Button>

          <div className="mt-4">{JSON.stringify(newEvent)}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
