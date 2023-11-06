import * as React from 'react'
import { Label } from "@/components/ui/label"

export function SwitchToggle() {
    return (
      <div className="flex items-center space-x-2">
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    )
  }