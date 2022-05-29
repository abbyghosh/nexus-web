import React from "react";

import LeftMenu from "./LeftMenu/LeftMenu";
import Tabs from "./common/Tabs/Tabs";
import TagsGroup from "./common/TagsGroup/TagsGroup";

import "./bookmarks.scss";

function Bookmarks() {
  const tabs = [
    { _id: 1, tab: "All" },
    { _id: 2, tab: "Articles" },
    { _id: 3, tab: "Youtube" },
  ];

  const tags = [
    { _id: 1, tab: "All" },
    { _id: 2, tab: "Articles" },
    { _id: 3, tab: "Youtube" },
  ];

  return (
    <main className="bookmarks">
      <LeftMenu />
      <div>
        <Tabs tabslist={tabs} />
        <TagsGroup tagslist={tags} />
      </div>
    </main>
  );
}

export default Bookmarks;
