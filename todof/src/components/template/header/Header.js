import React from 'react';

const Header = (props) => {
    const { title } = props;

    return(
        <header className="header">
            <h2 id="title">{title}</h2>
        </header>
    )
}

export default Header;