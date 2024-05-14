import React from "react";
import "./BlogPage.css";
import eventBus from "../../utils/eventBus";

export default function BlogPage() {
  const handleCopy = (e) => {
    eventBus.next({ type: "TEXT_COPIED", payload: e.target.textContent });
  };
  return (
    <div className="blog-container">
      <h1 className="blog-title">The Surprising Benefits of Procrastination</h1>
      <p className="blog-content" onCopy={handleCopy}>
        Procrastination, often viewed as a productivity killer, can
        paradoxically offer several benefits when managed effectively. While
        delaying tasks may seem counterintuitive, it can actually foster
        creativity, improve decision-making, and enhance overall productivity.
        When individuals procrastinate, they allow their minds to wander and
        explore alternative perspectives, leading to innovative solutions and
        fresh ideas. Moreover, delaying tasks can provide valuable time for
        reflection, enabling individuals to make more thoughtful and informed
        decisions. Additionally, procrastination can serve as a natural stress
        reliever, allowing individuals to recharge and approach tasks with
        renewed energy and focus. By embracing procrastination in moderation and
        leveraging its benefits, individuals can unlock new opportunities for
        personal growth and success.
      </p>
    </div>
  );
}
