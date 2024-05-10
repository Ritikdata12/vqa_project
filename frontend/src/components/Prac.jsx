// import React from 'react';
// import jsonData from './ss.js'; // Assuming data.json is in the same directory as your component

// const Prac = () => {
//   return (
//     <div>
//       {jsonData.map((item, index) => (
//         <div key={index}>
//           <p>Question: {item.question}</p>
//           <p>Answer: {item.answer}</p>
//           <img src={item.image_id} alt={`Image ${index + 1}`} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Prac;

import React from 'react';
import jsonData from './ss.js'; // Assuming data.json is in the same directory as your component

const Prac = () => {
  return (
    <div>
      {jsonData.slice(0, 20).map((item, index) => (
        <div key={index}>
          <p>Question: {item.question}</p>
          <p>Answer: {item.answer}</p>
          <img src={item.image_id} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default Prac;

