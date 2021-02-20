
  import parse from "snarkdown/index.js";


  const ipsums = [
    "**Lorem ipsum** dolor sit amet, consectetur adipisicing elit.:\n```JavaScript\nfunction loremIpsum() {\n  return 'Can be inserted';\n}\n```",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." ,
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." ,
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." ,
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ,
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness." ,
    "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure,\n\n but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful." ,
    "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure." ,
    "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?" ,
    "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?" ,
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga." ,
    "Et harum quidem rerum facilis est et expedita distinctio." ,
    "1. Nam libero tempore, cum soluta nobis est eligendi optio.\n2. Cumque nihil impedit quo minus id quod maxime placeat facere possimus.\n3. Omnis voluptas assumenda est, omnis dolor repellendus." ,
    "**Temporibus** autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae." ,
    "* Itaque earum rerum hic tenetur a sapiente delectus\n*  ut aut reiciendis voluptatibus maiores alias consequatur\n* aut perferendis doloribus asperiores repellat." ,
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." ,
    "Praesent vehicula ipsum eu mi condimentum interdum:\n```JavaScript\nfunction loremIpsum() {\n  return 'Can be inserted';\n}\n```" ,
    "Duis ornare rhoncus mi, vel lacinia urna feugiat vel." ,
    "*Pellentesque tincidunt sagittis metus.* Morbi eget libero diam, tincidunt placerat velit." ,
    "Aenean nec nisi id velit lobortis commodo. Suspendisse et nulla nisi, ut fermentum ipsum." ,
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit." ,
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." ,
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." ,
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." ,
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ,
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness." ,
    "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful." ,
    "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure." ,
    "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?" ,
    "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?" ,
  ];

  const ipsums_html = ipsums.map( ipsum => parse(ipsum) );
  
  const avatars = [
    "avatars/a.png",
    "avatars/b.png",
    "avatars/c.png",
  ];

  export function messageAt(index) {
    return {
      html    : ipsums_html[index % ipsums.length],
      avatar  : avatars[index % avatars.length],
      mine    : (index % avatars.length) == 0
    };
  }
