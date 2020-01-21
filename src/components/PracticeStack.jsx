import React from 'react';

const PracticeStack = ({ practiceStack }) => {
  return (
    <>
      {practiceStack.length > 0 ? (
        practiceStack.map(block => {
          return (
            <div className="practiceStack">
              Tempo:{block.tempo} {'\n'}
              Goal:{block.goal} {'\n'}
              incrementBy:{block.incrementBy} {'\n'}
              incrementEvery:{block.incrementEvery} {'\n'}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default PracticeStack;
