import React from 'react'
import './card.css'
import { ActionIcon } from "@mantine/core"

function StatCard({ amount, icon, label, color }) {
  return (
    <div className="card">
            <div className="content">
                <div className="left">
                    <p className="title">
                        {label}
                    </p>
                    <h2>{amount}</h2>
                </div>
                <div className="right">
                    <ActionIcon color={color} size={40} variant="light" radius={5}>
                        {icon}
                    </ActionIcon>
                </div>
            </div>
        </div>
  )
}

export default StatCard