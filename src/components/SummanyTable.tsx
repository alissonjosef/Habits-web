import { useEffect, useState } from "react";
import { generateDatesFromYearBeginning } from "../Utils/generation-date-from-year-berginning";
import { HabitDay } from "./HabitDay";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimumSammaryDateSize = 18 * 7;

const amountOfDaysToFill = minimumSammaryDateSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummanyTable() {
  const [sammary, setSammary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/sammary").then((response) => setSammary(response.data));
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((summan, index) => {
          return (
            <div
              key={`${summan}-${index}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {summan}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {sammary.length > 0 && summaryDates.map((date) => {
            const dayInSammary = sammary.find(day => {
                return dayjs(date).isSame(day.date, 'day')
            })
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSammary?.amount}
              defaultcompleted={dayInSammary?.completed}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
