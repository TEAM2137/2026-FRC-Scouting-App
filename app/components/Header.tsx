const Header =   () => {
return (
<div className="grid grid-cols-2 w-full h-full">

    <div className="col-span-1 text-left">
    <h1> Our scouting app logo</h1>
</div> 
<div className="col-span-1 text-right rounded-lg bg-black p-1.5" style={{width: "100px", height:"65px", position: "absolute", right: "0px", top: "0px"}}>
<h1>Our scouting app menu</h1>
</div> 
</div>
);
};
export default Header;  