import React from 'react'

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">About This Blog</h1>
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        <span className="font-semibold">Train of Thought</span> is a personal blogging platform created to give voice to ideas that matter. Whether it’s a fleeting thought or a deep reflection, this space encourages authentic self-expression.
      </p>
      <div className="text-left text-gray-800 space-y-4">
        <p>
          My name is <span className="font-semibold">Estifanos Kebede</span>. I'm a <span className="italic">Full Stack Web Developer</span> and a <span className="italic">Fourth-Year Electrical and Computer Engineering student</span> at <span className="font-medium">Addis Ababa University</span>.
        </p>
        <p>
          I built this blog to create a space for real thoughts—unfiltered, honest, and human. Every post you see here is part of a bigger journey of learning, sharing, and growing.
        </p>
        <p>
          Thanks for being here. Whether you're reading, posting, or just passing by — you’re part of this Train of Thought.
        </p>
      </div>
    </div>
  )
}

export default About
