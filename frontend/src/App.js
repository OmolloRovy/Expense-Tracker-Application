import React from 'react';
import { useState, useMemo } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard'; // Assuming this is your custom Dashboard component
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { ClerkProvider, useClerk } from "@clerk/clerk-react";


function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();

  // Call useClerk outside SignedIn for consistent rendering
  const clerk = useClerk();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />; 
      case 2:
        return <Dashboard />; 
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    
    <ClerkProvider>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
            <SignedIn>
              {/* Access user data if needed */}
              {clerk.user && (
                <p>
                  Welcome back, {clerk.user.firstName} {clerk.user.lastName}!
                </p>
              )}
              {displayData()}
            </SignedIn>
            <SignedOut>
              <p>Please sign in to access the dashboard.</p>
              <SignInButton />
            </SignedOut>
          </main>
        </MainLayout>
      </AppStyled>
    </ClerkProvider>
  );
}

const AppStyled = styled.div`
height: 100vh;
background-image: url(${props => props.bg});
position: relative;
main {
flex: 1;
background: rgba(252, 246, 249, 0.78);
border: 3px solid #FFFFFF;
backdrop-filter: blur(4.5px);
border-radius: 32px;
overflow-x: hidden;
&::-webkit-scrollbar {
width: 0;
}
}
`;
export default App;