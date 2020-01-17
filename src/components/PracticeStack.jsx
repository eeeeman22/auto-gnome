import React, { useState, useEffect } from 'react';

const PracticeStack = ({ practiceStack }) => {
  console.log(Array.isArray(practiceStack));
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
