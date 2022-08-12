import {useState, useEffect} from "react";
import itemFamily from "../recoil/itemFamily";
import { useRecoilState } from "recoil"

const Items = ({id}) => {
    const [itemState, setItemState] = useRecoilState(itemFamily(id));

    return (
      <div>
        <h2 >ID: {id}</h2>
        <h2 >Word: {itemState}</h2>
      </div>
    );
};

export default Items;