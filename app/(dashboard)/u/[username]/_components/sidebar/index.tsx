import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { Wrapper } from "./Wrapper";
import { Toggle } from "./toggle";
import { Navigation } from "./navigation";

export const Sidebar = () => {
  // const { collapsed, onExpand, onCollapse } = useCreatorSidebar(
  //   (state) => state
  // );
  // const label = collapsed ? "Expand" : "collapsed";
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};
