import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
      <section>
        <h1>Redux Example</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">帖子列表</Link>
          </div>
        </div>
      </section>
    </nav>
  )

export default Navbar;