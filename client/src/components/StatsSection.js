import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaUtensils, FaBuilding, FaHandsHelping, FaLeaf } from 'react-icons/fa';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const stats = [
    {
      icon: <FaUtensils className="w-8 h-8" />,
      value: 150000,
      label: '절약된 식사',
      suffix: '+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaBuilding className="w-8 h-8" />,
      value: 2500,
      label: '참여 사업체',
      suffix: '+',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <FaHandsHelping className="w-8 h-8" />,
      value: 500,
      label: '파트너 푸드뱅크',
      suffix: '+',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FaLeaf className="w-8 h-8" />,
      value: 300,
      label: 'CO₂ 감소 (톤)',
      suffix: 't',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const CountUpAnimation = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasAnimated) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [value, duration, hasAnimated]);

    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            우리가 만든 변화
          </h2>
          <p className="text-xl text-gray-300">
            FoodSave와 함께 더 나은 세상을 만들어가는 숫자들
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl"
                   style={{
                     backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                   }}>
              </div>
              
              <div className="relative bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 text-center border border-gray-700 hover:border-gray-600 transition-colors duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                  {stat.icon}
                </div>
                
                <div className="text-4xl font-bold text-white mb-2">
                  {hasAnimated ? (
                    <>
                      <CountUpAnimation value={stat.value} />
                      <span className="text-2xl ml-1">{stat.suffix}</span>
                    </>
                  ) : (
                    <span>0</span>
                  )}
                </div>
                
                <p className="text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg">
            * 2024년 1월부터 누적된 데이터입니다
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
