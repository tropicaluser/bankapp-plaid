import Image from "next/image";

import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";

const PermCategory = ({ category }: CategoryProps) => {
  const {
    bg,
    circleBg,
    text: { main, count },
    progress: { bg: progressBg, indicator },
    icon,
  } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
  topCategoryStyles.default;

  const progressValue = category.totalAmount !== 0 ? 100 : 0; // Set to 100 if totalAmount is anything but 0

  return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
      <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
          <h2 className={cn("font-medium", main)}>{category.name}</h2>
          <h2 className={cn("font-medium", main)}>{category.totalAmount}</h2>
          <h3 className={cn("font-normal", count)}>{Math.abs(category.totalAmount + category.maxAmount)} left</h3>
        </div>
        <Progress
          value={progressValue}
          className={cn("h-2 w-full", progressBg)}
          indicatorClassName={cn("h-2 w-full", indicator)}
        />
      </div>
    </div>
  );
};

export default PermCategory;
