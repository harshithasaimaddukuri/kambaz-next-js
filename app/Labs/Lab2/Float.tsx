export default function Float() {
  return (
    <div>
      <div id="wd-float-divs">
        <h2>Float</h2>
        <div>
          <img className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" 
            alt="Starship"
            style={{ width: '100px', margin: '10px' }}
          />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          <img className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
            style={{ width: '100px', margin: '10px' }}
          />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          <img className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
            style={{ width: '100px', margin: '10px' }}
          />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          <img className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
            style={{ width: '100px', margin: '10px' }}
          />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
          <div className="wd-float-done"></div>
        </div>
      </div>

      <div id="wd-float-divs" className="mt-4">
        <h2>Float Layout</h2>
        <div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
            Yellow
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
            Blue
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
            Red
          </div>
          <img className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
            style={{ width: '100px', margin: '10px' }}
          />
          <div className="wd-float-done"></div>
        </div>
      </div>
    </div>
  );
}