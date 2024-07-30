// components/Features.tsx
export default function Features() {
    const features = [
      { title: 'Create Notes', description: 'Easily create and edit your notes with a user-friendly interface' },
      { title: 'Share with Others', description: 'Collaborate by sharing your notes with team members or friends' },
      { title: 'Tag and Sort', description: 'Organize your notes with colorful tags for quick and easy access' },
    ]
  
    return (
      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }