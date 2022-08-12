import itemFamily from "../recoil/itemFamily";
import { useRecoilState } from "recoil"

const Items = ({id}) => {
    const [itemState, setItemState] = useRecoilState(itemFamily(id));
    return (
      <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center',}}>
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', width: "50%"}}>
          <h2 style={{alignSelf:"start"}}>{id}</h2>
        </div>
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', width: "50%"}}>
          <h2 style={{alignSelf:"end", color:"blue"}}>{itemState}</h2>
        </div>
      </div>
    );
};

export default Items;